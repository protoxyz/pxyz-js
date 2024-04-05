import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUser, getToken, getAuth } from '@protoxyz/auth';
import { CheckIcon, CircleIcon } from 'lucide-react';

export default async function Home() {
  const auth = await getAuth({});
  const user = await getUser();
  const token = await getToken();

  return (
    <main className="bg-accent flex min-h-screen  flex-col items-center justify-between p-24">
      <div className="mx-auto grid w-full max-w-md place-items-center gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Token</CardTitle>
          </CardHeader>
          <CardContent>
            {token && (
              <div className="text-muted-foreground flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-400" /> Token is valid
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Claims</CardTitle>
          </CardHeader>
          <CardContent>
            {auth && (
              <div className="flex flex-col gap-2">
                <div>
                  <span className="text-muted-foreground">ID: </span>
                  {auth.sub}
                </div>
                <div>
                  <span className="text-muted-foreground">Name: </span>
                  {auth.claims?.name}
                </div>
                <div>
                  <span className="text-muted-foreground">Email: </span>
                  {auth.claims?.email}
                </div>
                <div>
                  <span className="text-muted-foreground">Phone: </span>
                  {auth.claims?.phone}
                </div>
                <div>
                  <span className="text-muted-foreground">Username: </span>
                  {auth.claims?.username}
                </div>
                <div>
                  <span className="text-muted-foreground">Status: </span>
                  {auth.claims?.status}
                </div>
                <div>
                  <span className="text-muted-foreground">Role: </span>
                  {auth.claims?.role}
                </div>
                <div>
                  <span className="text-muted-foreground">Org ID: </span>
                  {auth.claims?.orgId}
                </div>
                <div>
                  <span className="text-muted-foreground">Org Role: </span>
                  {auth.claims?.orgRole}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Full Profile</CardTitle>
          </CardHeader>
          <CardContent>
            {user && (
              <div className="flex flex-col gap-2">
                <div>
                  <span className="text-muted-foreground">ID: </span>
                  {user.id}
                </div>
                <div>
                  <span className="text-muted-foreground">Name: </span>
                  {user.name}
                </div>
                <div>
                  <span className="text-muted-foreground">Emails: </span>
                </div>
                <ul className="list-inside list-disc pl-4">
                  {user.emailAddresses.map((email) => (
                    <li key={email.id} className=" flex items-center gap-2 ">
                      <CircleIcon className="h-1 w-1 text-gray-400" />
                      {email.email} (
                      {email.verifiedAt && (
                        <div className="text-muted-foreground flex items-center gap-1 text-xs">
                          <CheckIcon className="h-3 w-3 text-green-400" />{' '}
                          Verified
                        </div>
                      )}
                      {user.primaryEmailId === email.id && (
                        <div className="text-muted-foreground flex items-center gap-1 text-xs">
                          <CheckIcon className="h-3 w-3 text-green-400" />{' '}
                          Primary
                        </div>
                      )}
                      )
                    </li>
                  ))}
                </ul>
                <div>
                  <span>Phone: </span>
                  <ul className="list-inside list-disc pl-4">
                    {user.phoneNumbers.map((phone) => (
                      <li key={phone.id} className=" flex items-center gap-2 ">
                        <CircleIcon className="h-1 w-1 text-gray-400" />
                        {phone.phone} (
                        {phone.verifiedAt && (
                          <div className="text-muted-foreground flex items-center gap-1 text-xs">
                            <CheckIcon className="h-3 w-3 text-green-400" />{' '}
                            Verified
                          </div>
                        )}
                        {user.primaryPhoneId === phone.id && (
                          <div className="text-muted-foreground flex items-center gap-1 text-xs">
                            <CheckIcon className="h-3 w-3 text-green-400" />{' '}
                            Primary
                          </div>
                        )}
                        )
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-muted-foreground">Username: </span>
                  {user.username}
                </div>
                <div>
                  <span className="text-muted-foreground">Timezone: </span>
                  {user.timezone}
                </div>
                <div>
                  <span className="text-muted-foreground">Locale: </span>
                  {user.locale}
                </div>

                <div>
                  <span className="text-muted-foreground">Role: </span>
                  {user.role?.name}
                </div>
              </div>
            )}

            {!user && <pre>{JSON.stringify(user, null, 2)}</pre>}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
