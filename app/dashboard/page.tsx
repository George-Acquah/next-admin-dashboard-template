import InformationCards from "@/components/cards/infoCards";

const Dashboard = ({ searchParams }: _ISearchQuery) => {
    const user = searchParams?.q || "";
    const currentPage = Number(searchParams?.page) || 1;
    const pageSize = Number(searchParams?.size) || 5;

    console.log(user, currentPage, pageSize);
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* Right */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* Dashboard Cards */}
        <InformationCards />
      </div>
      {/* Left */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        {Array.from({ length: 2 }, (_, i) => (
          <div
            key={"second-array" + i}
            className="h-40 md:h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-800 "
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
