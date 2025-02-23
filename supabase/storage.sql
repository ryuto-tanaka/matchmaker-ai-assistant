
-- Create a new storage bucket for documents if it doesn't exist
insert into storage.buckets (id, name)
select 'documents', 'documents'
where not exists (
    select 1 from storage.buckets where id = 'documents'
);

-- Enable RLS
create policy "Authenticated users can upload documents"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'documents' AND
  auth.uid() = owner
);

create policy "Users can view their own documents"
on storage.objects for select
to authenticated
using (
  bucket_id = 'documents' AND
  owner = auth.uid()
);
