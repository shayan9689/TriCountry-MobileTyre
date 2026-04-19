/**
 * Shared props for react-scroll <Link>: shorter smooth scroll; instant when reduced motion.
 */
export function scrollNavLinkProps(reduceMotion, overrides = {}) {
  return {
    spy: true,
    smooth: !reduceMotion,
    duration: reduceMotion ? 0 : 280,
    offset: -96,
    ...overrides,
  };
}
