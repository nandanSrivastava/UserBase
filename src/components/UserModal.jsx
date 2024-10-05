import PropTypes from 'prop-types';  // Import PropTypes for type-checking

// Modal component to display content in a popup (with a backdrop)
const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      {/* Background overlay with a dark semi-transparent background */}
      
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
        {/* Modal content container with white background, padding, rounded corners, and centered positioning */}
        
        <button onClick={onClose} className="text-red-500 float-right">X</button>
        {/* Close button in the top-right corner of the modal */}
        
        {children}
        {/* Render any child elements passed to the modal */}
      </div>
    </div>
  );
};

// PropTypes validation to ensure correct props are passed
Modal.propTypes = {
  children: PropTypes.node.isRequired,  // children prop must be passed and should be a valid React node (e.g., elements, text)
  onClose: PropTypes.func.isRequired,   // onClose function is required for closing the modal
};

export default Modal;
