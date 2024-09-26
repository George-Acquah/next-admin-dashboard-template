import { SvgSpinner } from '@/components/ui/icons';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { Typography } from '../ui/typography';

export function DeleteClientBtn({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button
      variant='destructive'
      size='default'
      aria-disabled={pending}
      aria-label={label}
      className=""
      buttonType="submit"
    >
      {pending ? (
        <div className="flex items-center">
          <SvgSpinner className=" text-white w-4 h-4" fill="white" />
        </div>
      ) : (
        <>
          <Typography variant='span' className="sr-only">{label}</Typography>
          <TrashIcon className="w-4 fill-white" />
        </>
      )}
    </Button>
  );
}
