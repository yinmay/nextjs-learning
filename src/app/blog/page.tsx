export default function Blog() {
    const post=[
        {
            id:1,
            title:"Post 1",
            content:"Content of Post 1"
        },
        {
            id:2,
            title:"Post 2",
            content:"Content of Post 2"
        },
        {
            id:3,
            title:"Post 3",
            content:"Content of Post 3"
        },
    ]
  return (
    <div>
      <ul>
        {post.map((post)=>{
            return(
                <li key={post.id}><a href={`/blog/${post.id}`}>{post.title}</a></li>
            )
        })}
      </ul>
    </div>
  );
}
