def rewrite_commit(commit, metadata):
    if commit.author_email == b"avivirpariya@gmail.com":
        commit.author_email = b"codersarea12@gmail.com"
        commit.author_name = b"OM-BHUT"
    if commit.committer_email == b"avivirpariya@gmail.com":
        commit.committer_email = b"codersarea12@gmail.com"
        commit.committer_name = b"OM-BHUT"