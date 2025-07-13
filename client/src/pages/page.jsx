import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Page() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/pages/${slug}`)
      .then(res => setPage(res.data))
      .catch(() => setPage(null));
  }, [slug]);

  return page ? (
    <>
      <div className='inner-page-gap'>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>{page.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: page.editorData }} />
            </div>
          </div>
        </div>
      </div>
    </>
  ) : ( <h3>Page not found</h3> )
}
export default Page;
