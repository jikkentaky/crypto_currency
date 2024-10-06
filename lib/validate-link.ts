export const validateLink = (link: string) => {
    if (link && !link.includes('https')) {
      return 'https://' + link
    } else {
      return link
    }
  }
  