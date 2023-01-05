import './modal.scss';

const Modal = ({ active, setActive, title, description, date }) => {
  const handleHideModal = () => {
    setActive(false);
  };

  return (
    <>
      <div
        className={active ? 'modal active' : 'modal'}
        onClick={handleHideModal}
      >
        <div
          className="modal__content"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="modaltitle">TO DO</div>
          <div className="modaldiv">
            <span className="modaltitlespan">TITLE:</span>
            {title}
          </div>
          <div className="modaldiv">
            <span className="modaltitlespan">DESCRIPTION:</span>
            {description}
          </div>
          <div className="modaldiv">
            <span className="modaltitlespan">DATE:</span>
            {date}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
