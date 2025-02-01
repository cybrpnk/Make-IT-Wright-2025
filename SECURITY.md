There are quite a few improvements to be made here.

When the product is ported to an *actual* database software, such as Postgres via the open source project Okapi-Stripes, user authentication will be required.

For now we are using Google Drive as "database" (quote-unquote), which has a listing for users, items in the collection, and organizations that host those items. We are using private key authentication to access the Google Sheets "Database," but in the future, we would have to migrate to a paradigm where we store each user's data (students, members, organizations, administrators, etc.). 

Most likely I would explore mature open source projects to base the application off of, namely ReShare by the Open Library Foundation, which has seen years of steady development. Their software deals directly with "Interlibrary Loans," and is designed to connect to full-fledged Library Management Systems, such as FOLIO.