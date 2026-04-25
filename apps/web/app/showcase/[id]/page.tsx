import ShowcaseDetailContent from './ShowcaseDetailContent';

export async function generateStaticParams() {
  // We provide at least one ID for static export to generate the folder structure
  // In a real app, you might fetch all IDs here.
  return [{ id: '1' }];
}

export default async function ShowcaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ShowcaseDetailContent id={id} />;
}
