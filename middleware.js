export function middleware(request) {
  return Response.json({ msg: 'Hello there' });
}

export const config = {
  matcher: '/about',
};
