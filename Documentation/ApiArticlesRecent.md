# BACK ARTICLES/RECENT
THE RECENT ARTICLES API PROVIDES US WITH DETAILS OF THE MOST RECENT ARTICLES WITH THEIR TITLES, SUMMARY, PUBLICATION DATE AND THE AUTHOR OF THE ARTICLE.

### Endpoint: GET /api/articles/recent
 
Function that returns an article router for the API.
  @param {NoSQLWrapper} db - Instance of the NoSQLWrapper interface to interact with the database.
  @returns {express.Router} - An Express router to handle item routing.

@param {number} page.query - Page number (default: 1).
@param {number} pageSize.query - Page size (default: 10).
@returns {object} 200 - Paginated list of most recent articles.
@returns {object} 500 - Internal server error.
@security apiKey

# Get request parameters
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;

# Get recent paginated articles
      const recentArticles = await getRecentArticlesMock(page, pageSize);

# Return JSON response
      res.json(recentArticles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

# Logic to get mocked articles
  async function getRecentArticlesMock(page: number, pageSize: number): Promise<any[]> {
    const allArticles = await db.FindAllArticles();
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedArticles = allArticles.slice(startIndex, endIndex);
    return paginatedArticles;
  }




Example Response:
[
  {
    "title": "Article 1",
    "publicationDate": "2023-12-01T12:00:00Z",
    "summary": "Summary 1",
    "author": "Author 1"
  },
  {
    "title": "Article 2",
    "publicationDate": "2023-12-02T12:00:00Z",
    "summary": "Summary 2",
    "author": "Author 2"
  },
]
