import { useState } from 'react';
import Text_Block from './Custom-Blocks/text-block';
import Horizontal_Line from './Custom-Blocks/horizontal-line';

function AdminDashboard() {
  const [blocks, setBlocks] = useState([]);

  const addBlock = (type) => {
    const newBlock = { id: Date.now(), type };
    setBlocks(prev => [...prev, newBlock]);
  };

  const renderBlock = (block) => {
    switch (block.type) {
      case 'text':
        return <Text_Block key={block.id} />;
      case 'hr':
        return <Horizontal_Line key={block.id} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className='page-wrapper'>
        <div className="content-wrapper">
          <div className="row gy-4">
            <div className="col-12">
              <h1>Dashboard</h1>

              <div className="block-wrapper">
                {blocks.map(renderBlock)}
              </div>

              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#blockmodal"
              >
                Custom blocks
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="blockmodal"
        tabIndex="-1"
        aria-labelledby="blockmodalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="blockmodalLabel">Add Block</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div
                className="item d-inline-block p-3 m-2 rounded-3 border border-1 border-secondary"
                role="button"
                onClick={() => {
                  addBlock('text');
                  document.querySelector('#blockmodal .btn-close').click(); // auto-close modal
                }}
              >
                Text Block
              </div>
              <div
                className="item d-inline-block p-3 m-2 rounded-3 border border-1 border-secondary"
                role="button"
                onClick={() => {
                  addBlock('hr');
                  document.querySelector('#blockmodal .btn-close').click(); // auto-close modal
                }}
              >
                Horizontal Line
              </div>
            </div>
            {/* <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
