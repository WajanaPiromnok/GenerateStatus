import { twMerge } from "tailwind-merge";

interface DownloadProps {
  className?: string;
}

const Download = ({ className }: DownloadProps) => {
  return (
    <svg
      width="29"
      height="30"
      viewBox="0 0 29 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("w-20 h-20", className)}
    >
      <g>
        <path d="M19.5642 2.72266H9.43839C5.04005 2.72266 2.41797 5.35037 2.41797 9.75814V19.8936C2.41797 24.3135 5.04005 26.9412 9.43839 26.9412H19.5521C23.9505 26.9412 26.5726 24.3135 26.5726 19.9057V9.75814C26.5846 5.35037 23.9626 2.72266 19.5642 2.72266ZM10.2359 13.5968C10.5863 13.2456 11.1663 13.2456 11.5167 13.5968L13.5951 15.6796V8.18393C13.5951 7.68745 14.0059 7.27574 14.5013 7.27574C14.9967 7.27574 15.4076 7.68745 15.4076 8.18393V15.6796L17.4859 13.5968C17.8363 13.2456 18.4163 13.2456 18.7667 13.5968C19.1171 13.9479 19.1171 14.5292 18.7667 14.8804L15.1417 18.5131C15.0571 18.5979 14.9605 18.6584 14.8517 18.7069C14.743 18.7553 14.6221 18.7795 14.5013 18.7795C14.3805 18.7795 14.2717 18.7553 14.1509 18.7069C14.0421 18.6584 13.9455 18.5979 13.8609 18.5131L10.2359 14.8804C9.88547 14.5292 9.88547 13.9601 10.2359 13.5968ZM22.0413 21.153C19.6126 21.9643 17.063 22.376 14.5013 22.376C11.9396 22.376 9.39005 21.9643 6.9613 21.153C6.49005 20.9955 6.2363 20.4748 6.39339 20.0026C6.55047 19.5303 7.05797 19.2639 7.5413 19.4334C12.0363 20.935 16.9784 20.935 21.4734 19.4334C21.9446 19.276 22.4642 19.5303 22.6213 20.0026C22.7663 20.4869 22.5126 20.9955 22.0413 21.153Z" 
        fill="white" />
      </g>
    </svg>
  );
};

export default Download;
