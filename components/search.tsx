"use client";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import { SEARCH_PARAMS } from "@/utils/constants/search.constants";
// import { SvgSpinner } from "./ui/icons";
import { PlaceholdersAndVanishInput } from "./ui/vanishInputs";

interface IProps<T> {
  entityType: T; // Add entityType prop
  placeholders?: string[];
  disabled?: boolean;
}

// Define the type for SEARCH_PARAMS keys
type SearchParamKeys = keyof typeof SEARCH_PARAMS;

export default function Search<T extends SearchParamKeys>({
  entityType,
  disabled,
  placeholders = [
    "Search for entity 1",
    "Search for entity 2",
    "Search for entity 3",
  ],
}: IProps<T>) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(SEARCH_PARAMS[entityType], term);
    } else {
      params.delete(SEARCH_PARAMS[entityType]);
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={
          searchParams.get(SEARCH_PARAMS[entityType])?.toString() ?? ""
        }
        isPending={isPending}
        disabled={disabled}
      />
      {/* <MagnifyingGlassIcon
        className={`absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-black text-black-200/70`}
      />
      {isPending && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
          <SvgSpinner className="dark:text-gray-400" />
        </div>
      )} */}
    </div>
  );
}
