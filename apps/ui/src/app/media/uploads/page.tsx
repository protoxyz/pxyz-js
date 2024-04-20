import ImageUploader from './_components/upload-image';

export default function Page() {
  return (
    <main className="bg-accent flex min-h-screen  flex-col items-center gap-24 p-24">
      <div className="mx-auto grid w-full max-w-md place-items-center gap-4">
        Uploads
      </div>

      <ImageUploader />
    </main>
  );
}
