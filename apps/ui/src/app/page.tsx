import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { currentUser, getToken, auth } from '@protoxyz/auth';
import { CheckIcon, CircleIcon } from 'lucide-react';

export default async function Home() {
  const session = await auth({});
  const user = await currentUser();
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
                <CheckIcon className="h-4 w-4 text-green-400" /> Token is
                present
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Claims</CardTitle>
          </CardHeader>
          <CardContent>
            {!session && (
              <div className="text-muted-foreground flex items-center gap-2">
                <CircleIcon className="h-4 w-4 text-red-400" /> Not signed in
              </div>
            )}

            {session && (
              <div className="flex flex-col gap-2">
                <div>
                  <span className="text-muted-foreground">ID: </span>
                  {session.sub}
                </div>

                <div>
                  <span className="text-muted-foreground">Name: </span>
                  {session.claims?.name}
                </div>

                <div>
                  <span className="text-muted-foreground">Email: </span>
                  {session.claims?.email}
                </div>

                <div>
                  <span className="text-muted-foreground">Phone: </span>
                  {session.claims?.phone}
                </div>

                <div>
                  <span className="text-muted-foreground">Username: </span>
                  {session.claims?.username}
                </div>

                <div>
                  <span className="text-muted-foreground">Role: </span>
                  {session.claims?.role}
                </div>

                <div>
                  <span className="text-muted-foreground">Org ID: </span>
                  {session.claims?.orgId}
                </div>

                <div>
                  <span className="text-muted-foreground">Org Role: </span>
                  {session.claims?.orgRole}
                </div>

                <div>
                  <span className="text-muted-foreground">Org Role: </span>
                  {session.claims?.orgPermissions}
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
            {!user && (
              <div className="text-muted-foreground flex items-center gap-2">
                <CircleIcon className="h-4 w-4 text-red-400" /> Not signed in
              </div>
            )}

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
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
