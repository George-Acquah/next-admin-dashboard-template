import { Suspense } from "react";
import { Metadata } from "next";
import SkeletonTable from "@/components/ui/skeletons";
import Pagination from "@/components/ui/pagination";
import TeamsTable from "@/components/tables/teamsTable";
import { mockFetchData } from "@/lib/dataFetching";

export const metadata: Metadata = {
  title: "Teams",
};

export default async function TeamsPage({ searchParams }: _ISearchQuery) {
  const teams = searchParams?.q || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.size) || 5;

  // Fetch only the total number of pages
  const totalPages = await mockFetchData(27, { teams, pageSize });

  // Determine if we're on the last page
  const isLastPage = currentPage === totalPages;

  const rowsToRender = isLastPage ? Math.ceil(pageSize / 2) : pageSize;
console.log(rowsToRender);

  return (
    <div>
      {/* Show skeleton while data is being fetched */}
      <Suspense
        key={teams + currentPage}
        fallback={
          <SkeletonTable
            rowsToRender={7}
          />
        } // Handle last page
      >
        {/* Fetch and display the actual data */}
        <TeamsTable
          query={teams}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </Suspense>

      {/* Pagination based on the total number of pages */}
      <div className="mt-5 w-full">
        <Pagination totalPages={totalPages}/>
      </div>
    </div>
  );
}
