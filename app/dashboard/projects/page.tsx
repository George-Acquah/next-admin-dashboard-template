import { Suspense } from "react";
import { Metadata } from "next";
import ProjectsTable from "@/components/tables/projectsTable";
import SkeletonTable from "@/components/ui/skeletons";
import { mockFetchData } from "@/lib/dataFetching";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function ParkingCenterPage({ searchParams }: _ISearchQuery) {
  const center = searchParams?.q || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.size) || 5;

  const totalPages = await mockFetchData(
    2,
    {center,
    pageSize,}
  );

  return (
    <div className="">
      {/* <div className="flex items-center justify-between">
        <h1 className={`text-2xl`}>Parking Centers</h1>
      </div> */}
      {/* <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search entityType="CENTERS" placeholder="Search by Center Name" />
        <NormalAddBtn
          href={dashboardRoutes.PARKING_LOTS.ADD}
          label="Parking Center"
        />
      </div> */}
      <Suspense key={center + currentPage} fallback={<SkeletonTable numRows={3} numColumns={4} />}>
        <ProjectsTable
          query={center}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </Suspense>
      {/* <div className="mt-5 flex w-full justify-center flex-wrap gap-2 space-x-10">
        <Pagination totalPages={totalPages} />
      </div> */}
    </div>
  );
}
