import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SelectAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [error, setError] = useState('');
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/auth/get-address', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setAddresses(data.addresses);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch addresses.');
      }
    };

    fetchAddresses();
  }, []);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  return (
    <div className="min-h-52 p-6 text-black w-96 bg-white rounded-xl">
      <h1 className="text-3xl font-bold text-center mb-6">Select Address</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {addresses && addresses.length > 0 ? (
        <div className="flex flex-col items-center ">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {addresses.map((address, index) => (
              <div
                key={index}
                onClick={() => handleSelectAddress(address)}
                className={`cursor-pointer border p-4 rounded-md w-72 h-36 shadow ${
                  selectedAddress === address ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
              >
                <h2 className="font-semibold mb-2">{address.addressType}</h2>
                <p>{address.address1}</p>
                <p>{address.address2}</p>
                <p>
                  {address.city}, {address.country} - {address.zipCode}
                </p>
              </div>
            ))}
          </div>

          {selectedAddress && (
            <div className="mt-4 p-4 border border-green-500 rounded-md w-72 bg-green-50">
              <h2 className="font-semibold mb-2">Selected Address</h2>
              <p>{selectedAddress.address1}</p>
              <p>{selectedAddress.address2}</p>
              <p>
                {selectedAddress.city}, {selectedAddress.country} - {selectedAddress.zipCode}
              </p>
            </div>
          )}

          <button
            className={`mt-6 px-6 py-2 rounded text-white${
              selectedAddress ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-400 cursor-not-allowed'
            }`}
            onClick={() => navigate('/confirm-order', { state: { selectedAddress } })}
            disabled={!selectedAddress}
          >
            Continue
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-xl mb-4">No Addresses Found</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate('/add-address', { state: { email } })}
          >
            Add Address
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectAddress;
