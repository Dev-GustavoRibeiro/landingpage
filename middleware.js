export const config = {
  matcher: '/api/:path*',
};

export default function middleware(req) {
  // Garanta que todas as respostas da API são JSON
  const response = new NextResponse();
  response.headers.set('Content-Type', 'application/json');
  return response;
}