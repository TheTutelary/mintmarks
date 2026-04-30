import EvaluateContent from './EvaluateContent';

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '101' }, { id: '102' }];
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EvaluateContent id={id} />;
}
