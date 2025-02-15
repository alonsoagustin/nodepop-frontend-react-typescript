interface Props {
  isLoading: boolean;
}
const Spinner = ({ isLoading }: Props) => {
  if (!isLoading) return null;

  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hiden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
