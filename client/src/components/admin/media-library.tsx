import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Upload, Link as LinkIcon, Trash2, Copy, Image as ImageIcon } from "lucide-react";
import type { MediaFile } from "@shared/schema";

export default function MediaLibrary() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isUrlDialogOpen, setIsUrlDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [urlForm, setUrlForm] = useState({ url: "", name: "" });
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: mediaFiles, isLoading } = useQuery<MediaFile[]>({
    queryKey: ['/api/media'],
  });

  const uploadFileMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "File uploaded successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/media'] });
      setIsUploadDialogOpen(false);
      setSelectedFiles(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to upload file", variant: "destructive" });
    },
  });

  const addUrlMutation = useMutation({
    mutationFn: async (data: { url: string; name: string }) => {
      const response = await apiRequest('POST', '/api/admin/media/url', data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Media added from URL successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/media'] });
      setIsUrlDialogOpen(false);
      setUrlForm({ url: "", name: "" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to add media from URL", variant: "destructive" });
    },
  });

  const deleteMediaMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/admin/media/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Media file deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/media'] });
      setSelectedMedia(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete media file", variant: "destructive" });
    },
  });

  const handleFileUpload = () => {
    if (selectedFiles && selectedFiles.length > 0) {
      for (let i = 0; i < selectedFiles.length; i++) {
        uploadFileMutation.mutate(selectedFiles[i]);
      }
    }
  };

  const handleAddFromUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlForm.url && urlForm.name) {
      addUrlMutation.mutate(urlForm);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({ title: "Copied", description: "URL copied to clipboard" });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return 'External URL';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading media library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6" data-testid="media-library">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground" data-testid="text-media-title">Media Library</h2>
        <div className="flex space-x-3">
          <Dialog open={isUrlDialogOpen} onOpenChange={setIsUrlDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" data-testid="button-add-from-url">
                <LinkIcon className="w-4 h-4 mr-2" />
                Add from URL
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Media from URL</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddFromUrl} className="space-y-4">
                <div>
                  <Label htmlFor="media-url">Image URL</Label>
                  <Input
                    id="media-url"
                    type="url"
                    value={urlForm.url}
                    onChange={(e) => setUrlForm(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    required
                    data-testid="input-media-url"
                  />
                </div>
                <div>
                  <Label htmlFor="media-name">Display Name</Label>
                  <Input
                    id="media-name"
                    value={urlForm.name}
                    onChange={(e) => setUrlForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="My Image"
                    required
                    data-testid="input-media-name"
                  />
                </div>
                <Button type="submit" disabled={addUrlMutation.isPending} data-testid="button-submit-url">
                  {addUrlMutation.isPending ? "Adding..." : "Add Media"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-upload-files">
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Files</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file-upload">Select Images</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setSelectedFiles(e.target.files)}
                    data-testid="input-file-upload"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Supported formats: JPG, PNG, GIF, WebP (Max 10MB per file)
                  </p>
                </div>
                {selectedFiles && selectedFiles.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Selected files:</p>
                    <div className="space-y-1">
                      {Array.from(selectedFiles).map((file, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          {file.name} ({formatFileSize(file.size)})
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <Button 
                  onClick={handleFileUpload} 
                  disabled={!selectedFiles || selectedFiles.length === 0 || uploadFileMutation.isPending}
                  data-testid="button-submit-upload"
                >
                  {uploadFileMutation.isPending ? "Uploading..." : "Upload Files"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Media Files ({mediaFiles?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {!mediaFiles || mediaFiles.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No media files found</p>
              <p className="text-sm text-muted-foreground">Upload images or add them from URLs to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4" data-testid="media-grid">
              {mediaFiles.map((file) => (
                <div
                  key={file.id}
                  className="group relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                  onClick={() => setSelectedMedia(file)}
                  data-testid={`media-item-${file.id}`}
                >
                  <img
                    src={file.url}
                    alt={file.originalName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02OCA3NkgxMzJWMTI0SDY4Vjc2WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(file.url);
                        }}
                        data-testid={`button-copy-${file.id}`}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteMediaMutation.mutate(file.id);
                        }}
                        data-testid={`button-delete-${file.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="truncate" data-testid={`text-filename-${file.id}`}>{file.originalName}</p>
                    <p className="text-gray-300">{formatFileSize(file.size)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Media Detail Dialog */}
      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Media Details</DialogTitle>
          </DialogHeader>
          {selectedMedia && (
            <div className="space-y-4">
              <div className="text-center">
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.originalName}
                  className="max-w-full max-h-64 mx-auto rounded-lg"
                  data-testid="img-media-preview"
                />
              </div>
              <div className="space-y-2">
                <div>
                  <Label>Filename</Label>
                  <p className="text-sm text-muted-foreground" data-testid="text-media-filename">{selectedMedia.originalName}</p>
                </div>
                <div>
                  <Label>File Size</Label>
                  <p className="text-sm text-muted-foreground" data-testid="text-media-size">{formatFileSize(selectedMedia.size)}</p>
                </div>
                <div>
                  <Label>URL</Label>
                  <div className="flex space-x-2">
                    <Input value={selectedMedia.url} readOnly className="text-sm" data-testid="input-media-url-readonly" />
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(selectedMedia.url)}
                      data-testid="button-copy-url"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>Uploaded</Label>
                  <p className="text-sm text-muted-foreground" data-testid="text-media-uploaded">
                    {selectedMedia.uploadedAt ? new Date(selectedMedia.uploadedAt).toLocaleString() : 'External URL'}
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedMedia(null)} data-testid="button-close-detail">
                  Close
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteMediaMutation.mutate(selectedMedia.id)}
                  disabled={deleteMediaMutation.isPending}
                  data-testid="button-delete-media"
                >
                  {deleteMediaMutation.isPending ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
