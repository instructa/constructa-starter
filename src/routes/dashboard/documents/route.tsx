import type { CheckedState } from '@radix-ui/react-checkbox';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { AudioLines, Book, FileText, Image as ImageIcon, Video } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

import * as FileUpload from '~/components/dropzone';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Switch } from '~/components/ui/switch';
import { Checkbox } from '~/components/ui/checkbox';

import {
  completeDocumentUpload,
  deleteDocuments,
  directDocumentUpload,
  initDocumentUpload,
  listDocuments,
  type CompleteDocumentUploadInput,
  type DirectDocumentUploadInput,
  type DeleteDocumentsInput,
  type InitDocumentUploadInput,
} from '~/server/function/documents.server';
export const Route = createFileRoute('/dashboard/documents')({
  loader: async () => {
    const files = await listDocuments();
    return { files };
  },
  component: DocumentsPage,
});

type ListedFile = Awaited<ReturnType<typeof listDocuments>>[number];
type SelectableFile = { id: ListedFile['id']; key?: ListedFile['key'] };
type DeleteDocumentsPayload = NonNullable<DeleteDocumentsInput['items']>;

function DocumentsPage() {
  const router = useRouter();
  const { files } = Route.useLoaderData() as {
    files: Awaited<ReturnType<typeof listDocuments>>;
  };
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [search, setSearch] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [showKB, setShowKB] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<
    Map<string, DeleteDocumentsPayload[number]>
  >(new Map());
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const initUploadFn = useServerFn(initDocumentUpload);
  const completeUploadFn = useServerFn(completeDocumentUpload);
  const directUploadFn = useServerFn(directDocumentUpload);
  const deleteDocumentsFn = useServerFn(deleteDocuments);

  const initUpload = useMutation({
    mutationFn: (input: InitDocumentUploadInput) => initUploadFn({ data: input }),
  });
  const completeUpload = useMutation({
    mutationFn: (input: CompleteDocumentUploadInput) => completeUploadFn({ data: input }),
  });
  const directUpload = useMutation({
    mutationFn: (input: DirectDocumentUploadInput) => directUploadFn({ data: input }),
  });
  const deleteFilesMutation = useMutation({
    mutationFn: (payload: DeleteDocumentsPayload) =>
      deleteDocumentsFn({ data: { items: payload } }),
    onMutate: () => {
      setDeleteError(null);
    },
    onSuccess: async () => {
      setSelectedFiles(new Map());
      await router.invalidate();
    },
    onError: (err: unknown) => {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete files');
    },
  });

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return files;
    return files.filter((file) => {
      const haystack = [file.name, file.mimeType, file.fileType].filter(Boolean) as string[];
      return haystack.some((value) => value.toLowerCase().includes(needle));
    });
  }, [files, search]);

  const selectedEntries = useMemo(() => Array.from(selectedFiles.values()), [selectedFiles]);
  const selectedCount = selectedEntries.length;
  const selectAllState = useMemo<CheckedState>(() => {
    if (filtered.length === 0) return false;
    const allSelected = filtered.every((file) => selectedFiles.has(file.id));
    if (allSelected) return true;
    const noneSelected = filtered.every((file) => !selectedFiles.has(file.id));
    return noneSelected ? false : 'indeterminate';
  }, [filtered, selectedFiles]);

  const formatFileSize = (size?: number | null) => {
    if (!size || size <= 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const power = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1);
    const value = size / 1024 ** power;
    const decimals = value >= 10 || power === 0 ? 0 : 1;
    return `${value.toFixed(decimals)} ${units[power]}`;
  };

  const uploading = initUpload.isPending || completeUpload.isPending || directUpload.isPending;
  const deleting = deleteFilesMutation.isPending;

  const handleToggleAll = useCallback(
    (next: CheckedState) => {
      const shouldSelect = next === true || next === 'indeterminate';
      setSelectedFiles((prev) => {
        const updated = new Map(prev);
        if (shouldSelect) {
          filtered.forEach((file) => {
            updated.set(file.id, { id: file.id, key: file.key ?? undefined });
          });
        } else {
          filtered.forEach((file) => updated.delete(file.id));
        }
        return updated;
      });
    },
    [filtered],
  );

  const handleToggleFile = useCallback((file: SelectableFile, next: CheckedState) => {
    const shouldSelect = next === true || next === 'indeterminate';
    setSelectedFiles((prev) => {
      const updated = new Map(prev);
      if (shouldSelect) {
        updated.set(file.id, { id: file.id, key: file.key ?? undefined });
      } else {
        updated.delete(file.id);
      }
      return updated;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedFiles(new Map());
    setDeleteError(null);
  }, []);

  const handleDeleteSelected = async () => {
    if (selectedEntries.length === 0 || deleting) return;
    try {
      await deleteFilesMutation.mutateAsync(selectedEntries);
    } catch (err) {
      // handled in onError
    }
  };

  const handleUploadDoc = async () => {
    if (filesToUpload.length === 0) return;
    const file = filesToUpload[0];

    try {
      setErrorMessage(null);
      // 1) request presigned URL and db draft row
      const initResultRaw = await initUpload.mutateAsync({
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        title,
        content: text,
        addToKnowledgeBase: showKB,
      });

      const initResult = Array.isArray(initResultRaw)
        ? (initResultRaw[0] as typeof initResultRaw[0]) ?? {}
        : initResultRaw ?? {};

      let { id, uploadUrl, key } = initResult as Record<string, unknown> as {
        id?: string;
        uploadUrl?: string | null;
        key?: string;
      };

      if (!id) {
        throw new Error('Upload initialization failed: missing file id');
      }

      let shouldComplete = true;

      if (uploadUrl) {
        // 2a) upload directly to S3 via presigned URL
        await fetch(uploadUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type || 'application/octet-stream',
          },
        });
      } else {
        // 2b) fall back to server-side upload route
        const arrayBuffer = await file.arrayBuffer();
        const base64 = window.btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
        await directUpload.mutateAsync({
          id,
          key,
          originalName: file.name,
          size: file.size,
          mimeType: file.type || undefined,
          content: base64,
        });
        shouldComplete = false;
      }

      // 3) mark upload complete (send both id & key for robust server-side lookup)
      if (shouldComplete) {
        await completeUpload.mutateAsync({ id, key });
      }

      // refresh list
      await router.invalidate();

      // reset UI
      setShowUpload(false);
      setFilesToUpload([]);
      setTitle('');
      setText('');
      setShowKB(false);
    } catch (err) {
      console.error('Upload failed', err);
      setErrorMessage(err instanceof Error ? err.message : 'Upload failed');
    }
  };

  return (
    <>
      {/* main layout */}
      <div className="flex h-[calc(100vh-theme(spacing.16))]">
        {/* left nav */}
        <aside className="w-64 space-y-4 border-r px-4 py-6">
          <h2 className="font-semibold text-lg">Files</h2>
          <nav className="space-y-2 text-sm">
            <NavItem label="All Files" />
            <NavItem label="Documents" icon={FileText} />
            <NavItem label="Images" icon={ImageIcon} />
            <NavItem label="Audio" icon={AudioLines} />
            <NavItem label="Videos" icon={Video} />
            <div className="pt-4 font-medium text-muted-foreground text-xs uppercase">
              Knowledge Base
            </div>
            <NavItem label="Twitter Marketing" icon={Book} indent />
            <NavItem label="TailwindCSS" icon={Book} indent />
            <NavItem label="Ant Design" icon={Book} indent />
            <NavItem label="Python" icon={Book} indent />
            <NavItem label="React" icon={Book} indent />
            <NavItem label="Drizzle" icon={Book} indent />
            <NavItem label="NextJS" icon={Book} indent />
          </nav>
        </aside>

        {/* right pane */}
        <main className="relative flex flex-1 flex-col overflow-hidden">
          {/* toolbar */}
          <div className="flex items-center justify-between gap-2 border-b px-6 py-4">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search files"
              className="max-w-xs"
            />
            <Button onClick={() => setShowUpload(true)}>Upload</Button>
          </div>

          {/* header row */}
          <div className="flex items-center justify-between px-6 py-3">
            <h3 className="font-medium text-sm">
              All Files
              {filtered && (
                <span className="ml-2 text-muted-foreground">• Total {filtered.length}</span>
              )}
            </h3>
            <div className="flex items-center gap-2">
              <Switch checked={showKB} onCheckedChange={setShowKB} />
              <span className="text-muted-foreground text-xs">Show content in Knowledge Base</span>
            </div>
          </div>

          {/* file table */}
          <div className="flex-1 overflow-auto px-2">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-background">
                <tr className="border-b text-muted-foreground">
                  <th className="w-10 px-2 py-2 text-left font-normal">
                    <Checkbox
                      aria-label="Select all"
                      checked={selectAllState}
                      onCheckedChange={handleToggleAll}
                      disabled={filtered.length === 0 || deleting}
                    />
                  </th>
                  <th className="py-2 text-left font-normal">File</th>
                  <th className="py-2 text-left font-normal">Created At</th>
                  <th className="py-2 text-left font-normal">Size</th>
                </tr>
              </thead>
              <tbody>
                {filtered && filtered.length > 0 ? (
                  filtered.map((d) => (
                    <tr
                      key={d.id}
                      className="border-b transition-colors last:border-b-0 hover:bg-muted/50"
                    >
                      <td className="w-10 px-2">
                        <Checkbox
                          aria-label={`Select ${d.name}`}
                          checked={selectedFiles.has(d.id)}
                          onCheckedChange={(value) => handleToggleFile(d, value)}
                          disabled={deleting}
                        />
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <FileText className="size-4 text-muted-foreground" />
                          <span>{d.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-muted-foreground">
                        {d.createdAt ? new Date(d.createdAt).toLocaleString() : '--'}
                      </td>
                      <td className="py-3 text-muted-foreground">{formatFileSize(d.size)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 text-center">
                      No documents found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {selectedCount > 0 && (
            <div className="pointer-events-auto absolute bottom-6 right-6 z-20 w-full max-w-md rounded-md border bg-background/95 px-4 py-3 shadow-lg backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-sm">{selectedCount} selected</p>
                  {deleteError && (
                    <p className="mt-1 text-xs text-destructive">{deleteError}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearSelection}
                    disabled={deleting}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDeleteSelected}
                    disabled={deleting}
                  >
                    {deleting ? 'Deleting…' : 'Delete'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* upload dialog */}
      <Dialog
        open={showUpload}
        onOpenChange={(nextOpen) => {
          setShowUpload(nextOpen);
          if (!nextOpen) {
            setErrorMessage(null);
            setFilesToUpload([]);
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload document</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title-input">Title</Label>
              <Input
                id="title-input"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="text-input">Document Text</Label>
              <textarea
                id="text-input"
                className="h-40 w-full rounded-md border p-2 text-sm"
                placeholder="Paste text here…"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div>
              <Label>Attach files</Label>
              <FileUpload.Root
                value={filesToUpload}
                onValueChange={(updatedFiles: File[] | null) => {
                  setFilesToUpload(updatedFiles || []);
                }}
              >
                <FileUpload.Dropzone className="mt-1" />
                <FileUpload.Trigger className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                  Select Files
                </FileUpload.Trigger>
                {filesToUpload.length > 0 && (
                  <FileUpload.List className="mt-2">
                    {filesToUpload.map((file, i) => (
                      <FileUpload.Item key={file.name + i} value={file}>
                        <FileUpload.ItemPreview />
                        <FileUpload.ItemMetadata />
                        <FileUpload.ItemDelete />
                      </FileUpload.Item>
                    ))}
                  </FileUpload.List>
                )}
                {filesToUpload.length > 0 && (
                  <FileUpload.Clear className="mt-2 inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50">
                    Clear All
                  </FileUpload.Clear>
                )}
              </FileUpload.Root>
            </div>
          </div>

          {(errorMessage ||
            initUpload.isError ||
            completeUpload.isError ||
            directUpload.isError) && (
            <p className="text-red-600 text-sm">
              {errorMessage ||
                initUpload.error?.message ||
                completeUpload.error?.message ||
                directUpload.error?.message ||
                'An unknown error occurred during upload.'}
            </p>
          )}

          <DialogFooter>
            <Button onClick={handleUploadDoc} disabled={uploading || filesToUpload.length === 0}>
              {uploading ? 'Uploading…' : 'Upload'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function NavItem({
  label,
  icon: Icon,
  indent = false,
}: {
  label: string;
  icon?: React.ElementType;
  indent?: boolean;
}) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-foreground/80 hover:bg-muted hover:text-foreground ${
        indent ? 'pl-6' : ''
      }`}
    >
      {Icon && <Icon className="size-4" />}
      <span className="text-sm">{label}</span>
    </div>
  );
}
