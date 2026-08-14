"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input, Label, Textarea } from "@/shared/components/ui/input";
import { useProfileStore } from "@/features/profile/store";

export function ProfileForm() {
  const profile = useProfileStore((s) => s.profile);
  const updateProfile = useProfileStore((s) => s.updateProfile);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="p-name">Full name</Label>
          <Input id="p-name" value={profile.fullName} onChange={(e) => updateProfile({ fullName: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="p-email">Email</Label>
          <Input id="p-email" type="email" value={profile.email} onChange={(e) => updateProfile({ email: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="p-phone">Phone</Label>
          <Input id="p-phone" value={profile.phone} onChange={(e) => updateProfile({ phone: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="p-location">Location</Label>
          <Input id="p-location" value={profile.location} onChange={(e) => updateProfile({ location: e.target.value })} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="p-headline">Headline</Label>
          <Textarea
            id="p-headline"
            rows={2}
            placeholder="e.g. Flutter Developer passionate about mobile experiences"
            value={profile.headline}
            onChange={(e) => updateProfile({ headline: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  );
}
