export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  author: string;
  authorImage: string;
  authorTitle: string;
  authorBio: string;
  categories: string[];
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'ultimate-guide-schengen-visa',
    title: 'The Ultimate Guide to Schengen Visa Application',
    excerpt: 'Everything you need to know about applying for a Schengen visa, from documentation to interview tips.',
    content: `
      <h2>Understanding the Schengen Visa</h2>
      <p>The Schengen visa is one of the most popular travel documents in the world, allowing visitors to travel freely within the 26 Schengen countries...</p>
      
      <h3>Required Documents</h3>
      <ul>
        <li>Valid passport</li>
        <li>Visa application form</li>
        <li>Passport-size photos</li>
        <li>Travel insurance</li>
        <li>Flight itinerary</li>
        <li>Hotel reservations</li>
        <li>Bank statements</li>
      </ul>

      <h3>Application Process</h3>
      <p>The application process typically involves the following steps...</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3',
    date: 'March 10, 2024',
    author: 'Sarah Johnson',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    authorTitle: 'Senior Visa Consultant',
    authorBio: 'Sarah has helped thousands of travelers secure their visas over the past decade.',
    categories: ['Schengen Visa', 'Travel Tips'],
    readTime: 8
  },
  {
    slug: 'digital-nomad-visas',
    title: 'Digital Nomad Visas: The Future of Remote Work',
    excerpt: 'Discover countries offering special visas for remote workers and digital nomads.',
    content: `
      <h2>The Rise of Digital Nomad Visas</h2>
      <p>As remote work becomes increasingly common, many countries are introducing special visa programs...</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
    date: 'March 8, 2024',
    author: 'Michael Chen',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    authorTitle: 'Digital Nomad Expert',
    authorBio: 'Michael specializes in helping remote workers find their perfect destination.',
    categories: ['Digital Nomad', 'Work Visas'],
    readTime: 6
  },
  {
    slug: 'student-visa-tips',
    title: 'Top Tips for Student Visa Success',
    excerpt: 'Expert advice on securing your student visa for international education.',
    content: `
      <h2>Preparing for Your Student Visa</h2>
      <p>Studying abroad is an exciting opportunity, but securing a student visa requires careful preparation...</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
    date: 'March 5, 2024',
    author: 'Emily Rodriguez',
    authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    authorTitle: 'Education Consultant',
    authorBio: 'Emily has guided hundreds of students through their visa applications.',
    categories: ['Student Visa', 'Education'],
    readTime: 7
  }
];