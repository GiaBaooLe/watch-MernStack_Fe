import { useEffect, useState } from "react";
import { Button, Card, Input } from "antd";
import { Link } from "react-router-dom";
import watchApi from "../../api/watchApi";

const { Search } = Input;

const WatchPage = () => {
  const [watches, setWatches] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchWatches = async () => {
      try {
        const response = await watchApi.getAllWatch();
        setWatches(response.data);
        const uniqueBrands = [
          ...new Set(
            response.data
              .map((watch) => watch?.brand?.brandName)
              .filter(Boolean)
          ),
        ];
        setBrands(uniqueBrands);
      } catch (error) {
        console.error("Failed to fetch watches:", error);
      }
    };
    fetchWatches();
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
    setSelectedBrand("");
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    setSearchQuery("");
  };

  const filteredWatches = watches.filter((watch) => {
    const matchesBrand = selectedBrand
      ? watch?.brand?.brandName === selectedBrand
      : true;
    const matchesSearch = searchQuery
      ? watch.watchName.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesBrand && matchesSearch;
  });

  return (
    <div>
      <img
        className="w-full"
        src="https://truonghangwatch.com/uploads/2021/06/dong-ho-nam.jpg"
        alt=""
      />
      <div className="flex justify-center">
        <div className="flex w-1/2 ml-5 mt-5">
          <Search
            placeholder="Search watches"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={handleSearch}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <Button onClick={() => handleBrandClick("")}>All</Button>
        {brands.map((brand, index) => (
          <Button key={index} onClick={() => handleBrandClick(brand)}>
            {brand}
          </Button>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredWatches.map((watch) => (
          <Card
            key={watch._id}
            className="p-5"
            hoverable
            style={{ width: 280 }}
            cover={<img alt={watch.watchName} src={watch.image} />}
          >
            <div className="text-lg">{watch.watchName}</div>
            <div>
              <span className="font-bold">Price: </span>
              <span>{watch.price} VND</span>
            </div>
            <span className="font-bold">Brand: </span>
            <span>{watch?.brand?.brandName || "No Brand"}</span>
            <div className="flex justify-center">
              <Link to={`/detail/${watch._id}`}>
                <Button className="bg-zinc-800 text-white">Detail</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WatchPage;
