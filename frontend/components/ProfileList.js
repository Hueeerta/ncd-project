function ProfileList({ buskerList }) {
  return (
    <>
      <div className="list-group h-100">
        {buskerList.map((busker, key) => (
          <div
            key={key + busker.account_id}
            className="list-group-item list-group-item-action d-flex flex-row justify-content-start"
            onClick={() => {
              console.log(busker.account_id);
            }}
          >
            <img
              src={busker.img}
              alt={busker.name}
              className="img-thumbnail mr-4 rounded"
              width="70"
            />
            <p>
              {busker.name}, {busker.category}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProfileList;
