# API Documentation

## Authentication Routes `/api/auth`

### `/login` POST

Returns HTTP Only Cookies

Example Body:
```json
{
  "userName": "RizMitch",
  "password": "12345"
}
```

### `/register` POST

Example Body:
```json
{
  "userName": "RizMitch",
  "email": "rizmitch@outlook.com",
  "password": "12345"
}
```

### `/logout` DELETE

---

## User Routes `/api/users`

### `/:id` GET

Example Response Body:
```json
{
  "userName": "RizMitch",
  "description": null,
  "totalProblems": 12,
  "correctProblemsRatio": 0.17,
  "averageTimeSpendPerProblem": 0
}
```

> [!IMPORTANT]
> For display to users

### `/:id` PATCH

Example Body:
```json
{
  "userName": "TizBitch",
  "email": "rizmitch@gmail.com",
  "password": "123455",
  "description": "Sigma Sugma"
}
```

> [!IMPORTANT]
> Details / fields you wish to change about the user

### `/:id` DELETE

Example Body:
```json
{
  "password": "12345"
}
```

> [!IMPORTANT]
> Password is sent in as confirmation to delete the user

---

## Admin Routes `/api/admin`

### `/` GET




---

## Parsons Problem Routes `/api/parsonProblem`

### `/` POST

Example Body:
```json
{
  "topic": "CSV",
  "theme": "kanye's toys'"
}
```

Example Response:
```json
{
  "problemId": "66e99b847aeeb459da5a5f99",
  "prompt": "Assist Kanye with organizing his vast collection of toys, utilizing pandas to parse a CSV file showcasing details of each item. Each toy has a unique ID, name, brand, and price. Help Kanye determine the most expensive toy within each brand, showcasing the results in a user-friendly format.",
  "scrambledBlocks": [
    "import pandas as pd",
    "filtered_df = toys_df[toys_df['Rank'] == 1]",
    "toys_df = pd.read_csv('kanye_toys.csv')",
    "toys_df['Rank'] = toys_df.groupby('Brand')['Price'].rank(method='max', ascending=False)",
    "print(filtered_df[['ID', 'Name', 'Brand', 'Price']])"
  ]
}
```

### `/submit/:id` POST

Example Body:
```json
{
  "codeBlocks": [
    "df.fillna('Unknown', inplace=True)",
    "df = pd.read_csv('kanye_toys.csv')",
    "df.to_csv('kanye_toys_updated.csv', index=False)",
    "df['size'] = pd.to_numeric(df['size'], errors='coerce')",
    "df['size'] = df['size'].astype(int)",
    "import pandas as pd"
  ]
}
```

Example Response:
```json
{
  "passed": false,
  "terminalMessage": [
    "Line 1: F821 undefined name 'df'",
    "Line 2: F821 undefined name 'pd'",
    "Line 4: F821 undefined name 'pd'",
    "Line 6: F401 'pandas as pd' imported but unused",
    "Line 6: E402 module level import not at top of file"
  ]
}
```


---