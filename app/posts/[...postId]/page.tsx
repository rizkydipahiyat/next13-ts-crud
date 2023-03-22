
export default function Post({ params }: { params: { postId: string } }) {
  console.log(params);
  return (
    <div>Post {params.postId[0]}</div>
  )
}
