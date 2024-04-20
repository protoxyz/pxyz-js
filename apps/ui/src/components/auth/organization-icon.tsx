import Image from "next/image";

export function OrganizationIcon({ iconUri, name }: { iconUri: string | null | undefined, name: string }) {
    return (
        <div className="flex items-center justify-center">
            {
                !iconUri && (
                    <div className="h-8 w-8 aspect-square bg-accent rounded" />
                )
            }

            {
                iconUri && (
                   <Image 
                        width={128} 
                        height={128}
                        src={iconUri} 
                        className="h-8 w-8 aspect-square" 
                        alt={name} 
                        title={name} 
                    />
                )
            }
        </div>
    );
}