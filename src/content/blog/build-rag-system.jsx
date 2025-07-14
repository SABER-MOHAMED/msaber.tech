import Image from 'next/image';

export default function BuildRAGSystem() {
  return (
    <div>
      <Image
        src="/blog/build-rag-system.png"
        className="blog-hero-image"
        alt="Build a RAG System"
        width={800}
        height={400}
        priority
      />

      <p>06 July, 2025 ・🕒 8 min read</p>
      <p>
        As AI becomes increasingly accessible, we gain powerful opportunities to
        build intelligent assistants for specific, real-world problems. In my
        case, that meant helping university students get accurate, instant
        answers about academic procedures without relying on complex portals.
      </p>
      <p>
        This article explains how I built <strong>AskUiz</strong>, a student
        assistant app powered by a{' '}
        <strong>Retrieval-Augmented Generation (RAG)</strong> architecture. It
        combines <strong>FastAPI</strong>, <strong>LlamaIndex</strong>,{' '}
        <strong>Pinecone</strong>, and <strong>GPT-4</strong> to answer
        pedagogical questions about Ibn Zohr university.
      </p>
      <p>
        Large language models (LLMs) like GPT-4 have revolutionized how machines
        understand and generate human language. However, despite their
        remarkable capabilities, these models are limited by static training
        data and can sometimes produce inaccurate or outdated responses. They
        don't inherently "know" your specific documents or data. (the MCP
        protocol does cover this limitation though)
      </p>
      <p>
        And here comes <strong>Retrieval-Augmented Generation</strong>, which
        enhances LLM performance by integrating external knowledge sources into
        the generation process. The flow is simple:
      </p>
      <ol>
        <li>
          <strong>Index your data</strong> (PDFs, internal docs, web pages..)
        </li>
        <li>
          <strong>Retrieve relevant chunks</strong> based on user queries
        </li>
        <li>
          <strong>Feed that context into the language model</strong>
        </li>
        <li>
          <strong>Generate answers grounded in facts</strong>
        </li>
      </ol>
      <p>
        Instead of relying solely on what the model has memorized during
        training, RAG systems retrieve relevant documents from a dedicated
        knowledge base and feed this information into the model to produce more
        accurate answers.
      </p>
      <p>
        AskUiz is a practical example of this architecture, we have built it
        using the following stack:
      </p>
      <h2>Tech Stack</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Component</th>
              <th>Tool</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>API Backend</td>
              <td>Python + FastAPI</td>
            </tr>
            <tr>
              <td>Embedding & Retrieval</td>
              <td>LlamaIndex</td>
            </tr>
            <tr>
              <td>Vector Store</td>
              <td>Pinecone</td>
            </tr>
            <tr>
              <td>Language Model</td>
              <td>OpenAI GPT-4</td>
            </tr>
            <tr>
              <td>Rate Limiting</td>
              <td>Redis</td>
            </tr>
            <tr>
              <td>Frontend</td>
              <td>Next</td>
            </tr>
            <tr>
              <td>Deployment</td>
              <td>Vercel, Render</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>System Architecture</h2>
      <p>And here's a high-level overview of AskUiz's architecture:</p>
      <img
        src="/blog/askuiz-architecture.png"
        alt="AskUiz Architecture"
        width={600}
        height={500}
        style={{ objectFit: 'scale-down', margin: '1rem 0' }}
      />
      <p>
        I leveraged Python's ecosystem with libraries like LlamaIndex for
        document processing, Pinecone for vector storage, and OpenAI's API for
        embedding and completion.
      </p>
      <h2>Data Collection and Preprocessing</h2>
      <p>
        The first critical step was gathering high-quality, domain-relevant
        data. For AskUiz, this included:
      </p>
      <ul>
        <li>Course and degree information</li>
        <li>Administrative procedures documentation</li>
        <li>Location and contact details for university institutions</li>
        <li>Services and student affairs information</li>
      </ul>
      <p>
        Once collected, data preprocessing transforms raw content into a
        structured format suitable for embedding and retrieval:
      </p>
      <h3>The Preprocessing Pipeline</h3>
      <ol>
        <li>
          <strong>Data Cleaning:</strong> Removing unnecessary characters,
          correcting formatting, stripping HTML tags, and standardizing encoding
        </li>
        <li>
          <strong>Chunking:</strong> Breaking documents into smaller,
          semantically meaningful segments (I used approximately 500 tokens per
          chunk with 50-token overlaps)
        </li>
        <li>
          <strong>Metadata Addition:</strong> Adding source information,
          document type, faculty, and other relevant attributes to each chunk
        </li>
        <li>
          <strong>Indexing:</strong> Converting content into fixed-size vectors
          using embedding models
        </li>
      </ol>
      <p>
        I used <strong>LlamaIndex</strong> to manage document parsing, chunking,
        and routing embeddings to <strong>Pinecone</strong> for storage:
      </p>

      <h2>Retrieval from Pinecone</h2>
      <p>When a user asks a question like:</p>
      <blockquote>"How can I get my license diploma from ENSIASD?"</blockquote>
      <p>The retrieval process involves:</p>
      <ol>
        <li>Embedding the query using the same model used for documents</li>
        <li>Searching for the most semantically similar chunks in Pinecone</li>
        <li>
          Returning the top <code>k</code> relevant pieces to use in generation
        </li>
      </ol>

      <p>
        This ensures GPT-4 has <em>real context</em> instead of hallucinating
        answers based on general knowledge.
      </p>
      <h2>Prompting & Generation with GPT-4</h2>
      <p>With the relevant context retrieved, we build a structured prompt:</p>
      <pre>
        <code>
          {`You are a university assistant for Ibn Zohr University. 
Answer the question based ONLY on the context provided below.
If you can't find the answer in the context, say "I don't have 
enough information to answer this question accurately."

Context:
- [Chunk 1 content]
- [Chunk 2 content]
- [Chunk 3 content]
...

User question:
"{user_query}"`}
        </code>
      </pre>
      <p>
        Then we send it to <strong>OpenAI's GPT-4</strong> via the{' '}
        <code>chat/completions</code> endpoint:
      </p>
      <pre>
        <code>
          {`response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt_with_context}
    ],
    temperature=0.3  # Lower temperature for more factual responses
)`}
        </code>
      </pre>
      <p>
        The response is then parsed and sent back to the frontend. This approach
        grounds the model's answers in the specific documents we've provided,
        reducing hallucinations significantly.
      </p>
      <h2>Frontend Experience (Next.js)</h2>
      <p>
        On the frontend, AskUiz uses <strong>Next.js</strong> and{' '}
        <strong>TypeScript</strong> to:
      </p>
      <ul>
        <li>Send queries to the backend API</li>
        <li>Display GPT-4's answers with minimal latency</li>
        <li>Collect user feedback (e.g., helpful/unhelpful)</li>
        <li>
          Track usage with <strong>Vercel Analytics</strong>
        </li>
      </ul>
      <p>
        The interface is mobile-first and responsive, designed to work well on
        campus or in transit. Since many students access the service via mobile
        devices, optimizing for smaller screens was a priority.
      </p>
      <h2>Rate Limiting with Redis</h2>
      <p>
        To avoid abuse and manage costs, I implemented{' '}
        <strong>IP-based rate limiting</strong>:
      </p>
      <ul>
        <li>Maximum 20 requests per day per IP</li>
        <li>
          Tracked in <strong>Redis</strong> with TTL (time-to-live) keys
        </li>
      </ul>
      <p>
        This was simple to implement in FastAPI using dependency injection and
        provides sufficient protection for an MVP while keeping the service
        accessible.
      </p>
      <h2>Deployment</h2>
      <p>
        The deployment strategy keeps the system manageable and cost-effective:
      </p>
      <ul>
        <li>
          <strong>Frontend</strong> is deployed to <strong>Vercel</strong>
        </li>
        <li>
          <strong>Backend API</strong> runs on <strong>Render</strong>
        </li>
        <li>Pinecone and OpenAI are accessed as managed services</li>
        <li>
          The whole system is monitored with logs, analytics, and feedback
          mechanisms
        </li>
      </ul>

      <h2>Key Lessons Learned</h2>
      <ol>
        <li>
          <strong>Quality over quantity.</strong> Well-curated data beats large
          volumes of irrelevant content.
        </li>
        <li>
          <strong>Prompt engineering is critical.</strong> The same data with a
          better prompt returns better answers.
        </li>
        <li>
          <strong>Rate limiting matters.</strong> Even MVPs need basic
          protection against abuse.
        </li>
        <li>
          <strong>Tool selection is important.</strong> LlamaIndex + Pinecone +
          GPT-4 proved to be a powerful combination for RAG.
        </li>
        <li>
          <strong>Users prioritize clarity and speed.</strong> Simple UI and
          fast answers matter more than flashy features.
        </li>
      </ol>
      <h2>Tips for Building Your Own RAG System</h2>
      <ul>
        <li>
          <strong>Start small:</strong> Begin by indexing just a few
          high-quality documents
        </li>
        <li>
          <strong>Use frameworks:</strong> LlamaIndex or LangChain help avoid
          writing boilerplate for parsing and chunking
        </li>
        <li>
          <strong>Choose a scalable vector DB:</strong> Pinecone is reliable and
          scales well, there is also FAISS by Meta a good open-source
          alternative.
        </li>
        <li>
          <strong>Consider caching:</strong> Store popular queries to reduce
          costs, especially with GPT-4
        </li>
        <li>
          <strong>Implement feedback:</strong> Add user feedback mechanisms from
          day one
        </li>
        <li>
          <strong>Test with real users:</strong> Nothing beats actual user
          testing for uncovering edge cases
        </li>
      </ul>
    </div>
  );
}
