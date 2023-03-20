const Loader = ({ inComp = false }) => {
  return (
    <div
      className={`flex justify-center items-center py-4 ${
        inComp ? 'max-h-screen' : 'h-screen'
      }`}
    >
      <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-gray-400" />
    </div>
  );
};

export default Loader;
