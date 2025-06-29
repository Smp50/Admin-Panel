import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Page() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/pages/${slug}`)
      .then(res => setPage(res.data))
      .catch(() => setPage(null));
  }, [slug]);

  return page ? (
    <div>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.editorData }} />
    </div>
  ) : <p>Page not found</p>;
}
export default Page;
