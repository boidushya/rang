import { redirect } from "next/navigation";

export default function Share({ params }: { params: { slug: string } }) {
  const { slug } = params;
  //   // redirect to the home page with UTM parameters
  //   redirect(`/?utm_source=share&utm_medium=link&utm_campaign=${slug}`);

  return (
    <div>
      <h1>Share</h1>
      <p>Slug: {slug}</p>
    </div>
  );
}
