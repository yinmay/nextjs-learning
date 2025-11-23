import ThumbUpButton from './thumb-up';

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Blog Post {id}</h1>
      <p>This is the content for blog post {id}.</p>
      <a href="/blog">Back to Blog List</a>
      <ThumbUpButton id={id} />
    </div>
  );
}
