import React, { useState } from "react";
import "./BlogPage.css";
const blogData = [
  {
    title: "Why Most Career Roadmaps Fail Students",
    category: "Career Reality Insights",
    snippet:
      "Traditional career roadmaps look clean on paper but collapse in the real world. Here’s why most students fail to follow them.",
    content: `
Career roadmaps are everywhere — YouTube videos, LinkedIn posts, coaching institutes, and paid mentorship programs. 
They promise clarity, structure, and certainty. But in reality, most students quietly abandon these roadmaps within months.

The biggest flaw is **assumption-based planning**. Roadmaps assume unlimited time, motivation, mental energy, and financial stability. 
They rarely account for exams, family pressure, burnout, self-doubt, or slow learning curves.

Another critical issue is **linear thinking**. Real careers are non-linear. Students switch interests, fail interviews, 
discover weaknesses late, or get stuck revising fundamentals repeatedly. Roadmaps don’t adapt when life intervenes.

Most roadmaps also confuse **information consumption with skill acquisition**. Watching tutorials feels productive, 
but without feedback loops, evaluation, and real-world application, progress stalls silently.

Successful students don’t follow rigid roadmaps. They follow **adaptive systems** — systems that measure progress, 
detect risk early, and adjust direction before burnout happens.

Careers don’t fail due to lack of effort. They fail due to lack of realistic systems.
    `,
    readTime: "7 min",
    featured: true,
  },

  {
    title: "Why 70% of Students Quit Web Development After 6 Months",
    category: "Failure Case Studies",
    snippet:
      "Web development attracts millions of beginners every year — but most quietly quit. Here’s the uncomfortable truth.",
    content: `
Web development has one of the highest entry rates and one of the highest dropout rates in tech.

The first reason is **false early confidence**. HTML and CSS feel easy, giving students the illusion that the journey will stay smooth.
Reality hits when JavaScript, asynchronous logic, frameworks, and debugging appear.

The second reason is **lack of milestones**. Most learners don’t know whether they’re progressing correctly.
They either move too fast without understanding or stay stuck revising basics forever.

Another silent killer is **comparison fatigue**. Social media shows students building projects in weeks,
while most beginners struggle for months. This creates self-doubt and eventually quitting.

What successful learners do differently is simple:
They focus on **depth over speed**, build ugly projects early, and measure progress realistically.

Quitting isn’t a failure of capability. It’s a failure of guidance and expectation management.
    `,
    readTime: "8 min",
  },

  {
    title: "How Knowledge Retention Actually Works",
    category: "Learning & Skill Science",
    snippet:
      "Why do we forget what we studied last month? Cognitive science has a clear answer.",
    content: `
Most students believe forgetting means they’re bad at studying. Science says otherwise.

Human memory works through **active recall**, not passive exposure. Reading notes or watching videos repeatedly 
creates familiarity, not retention.

Retention improves when learning is spaced over time, concepts are recalled without support, 
and mistakes are corrected through feedback.

Another overlooked factor is **cognitive load**. Studying too many concepts together overwhelms working memory.
Breaking learning into focused chunks drastically improves understanding.

The best learners don’t study more — they study **smarter**.
They test themselves, revise strategically, and accept temporary confusion as part of learning.

Forgetting isn’t failure. It’s feedback.
    `,
    readTime: "6 min",
  },

  {
    title: "How We Designed a Constraint-Based Career Engine",
    category: "Product & System Design",
    snippet:
      "Behind the scenes of designing a system that adapts to real student limitations.",
    content: `
Most career tools fail because they optimize for ideals, not constraints.

We designed a system that starts with **limitations** — available time, academic background,
financial pressure, attention span, and emotional fatigue.

Instead of generating a single perfect path, the engine creates multiple feasible paths,
each with risk indicators and fallback options.

As users progress, the system recalculates paths based on performance data and behavioral signals.
This allows early intervention before burnout or confusion occurs.

Career planning should behave like navigation — recalculating when you miss a turn,
not blaming you for it.
    `,
    readTime: "9 min",
  },

  {
    title: "Backend Developer Roadmap: A Reality Check",
    category: "Roadmap Breakdowns",
    snippet:
      "Backend development is powerful — but far more demanding than most roadmaps admit.",
    content: `
Backend development involves far more than learning a programming language.

Students must understand databases, networking, authentication, scalability,
system design, and debugging under pressure.

Most roadmaps underestimate the **time required to mature these skills**.
This creates unrealistic expectations and self-blame.

The truth is: backend developers aren’t built fast — they’re built solid.

Those who survive the journey focus on fundamentals, build slow but strong,
and embrace confusion as a long-term companion.

Depth beats speed every time.
    `,
    readTime: "7 min",
  },
];


const categories = [
  "All",
  "Career Reality Insights",
  "Failure Case Studies",
  "Learning & Skill Science",
  "Product & System Design",
  "Roadmap Breakdowns",
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [openedBlog, setOpenedBlog] = useState(null);

  const filteredBlogs =
    selectedCategory === "All"
      ? blogData
      : blogData.filter(blog => blog.category === selectedCategory);

  const featuredBlog = blogData.find(blog => blog.featured);

  // Dynamic related articles: exclude currently opened blog
  const relatedArticles = blogData
    .filter(blog => blog !== openedBlog && blog !== featuredBlog)
    .slice(0, 3);

  return (
    <div className="blog-page">
      <div className="navbar-spacer"></div>

      {/* Hero */}
      <section className="blog-hero">
        <h1>Insights, Case Studies & System Design</h1>
        <p>Deep dives into career realities, failure patterns, and adaptive systems for serious learners.</p>
      </section>

      {/* Category Filters */}
      <section className="blog-categories">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Featured Article */}
      {featuredBlog && !openedBlog && (
        <section className="featured-article">
          <h2>Featured Article</h2>
          <div
            className="blog-card featured-card"
            onClick={() => setOpenedBlog(featuredBlog)}
            style={{ cursor: "pointer" }}
          >
            <h3>{featuredBlog.title}</h3>
            <p className="blog-category">{featuredBlog.category}</p>
            <p className="blog-snippet">{featuredBlog.snippet}</p>
            <p className="blog-readtime">{featuredBlog.readTime} read</p>
          </div>
        </section>
      )}

      {/* Blog Cards / Full Blog View */}
      <section className="blog-cards">
        {openedBlog ? (
          <div className="blog-card opened-blog">
            <button
              className="btn-primary btn-secondary"
              onClick={() => setOpenedBlog(null)}
            >
              Back
            </button>
            <h2>{openedBlog.title}</h2>
            <p className="blog-category">{openedBlog.category}</p>
            <p className="blog-snippet">{openedBlog.content}</p>
            <p className="blog-readtime">{openedBlog.readTime} read</p>
          </div>
        ) : (
          filteredBlogs.map((blog, idx) => (
            <div
              key={idx}
              className="blog-card"
              onClick={() => setOpenedBlog(blog)}
              style={{ cursor: "pointer" }}
            >
              <h3>{blog.title}</h3>
              <p className="blog-category">{blog.category}</p>
              <p className="blog-snippet">{blog.snippet}</p>
              <p className="blog-readtime">{blog.readTime} read</p>
            </div>
          ))
        )}
      </section>

      {/* Related Articles (only when a blog is opened) */}
      {openedBlog && relatedArticles.length > 0 && (
        <section className="related-articles">
          <h2>Related Articles</h2>
          <div className="blog-cards">
            {relatedArticles.map((blog, idx) => (
              <div
                key={idx}
                className="blog-card"
                onClick={() => setOpenedBlog(blog)}
                style={{ cursor: "pointer" }}
              >
                <h3>{blog.title}</h3>
                <p className="blog-category">{blog.category}</p>
                <p className="blog-readtime">{blog.readTime} read</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Publish a Blog */}
      {/* <section className="publish-blog">
        <button
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Publish a Blog"}
        </button>

        {showForm && (
          <form className="publish-form">
            <label>
              Title:
              <input type="text" placeholder="Enter blog title" required />
            </label>
            <label>
              Category:
              <select required>
                <option value="">Select category</option>
                {categories.slice(1).map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </label>
            <label>
              Snippet / Content:
              <textarea placeholder="Write your blog here..." required />
            </label>
            <label>
              Read Time:
              <input type="text" placeholder="e.g., 5 min read" required />
            </label>
            <button type="submit" className="btn-primary">
              Submit Blog
            </button>
          </form>
        )}
      </section> */}
    </div>
  );
};

export default BlogPage;
