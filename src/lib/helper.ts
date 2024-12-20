export type OpenGraphType = {
  siteName: string;
  description: string;
  templateTitle?: string;
  logo?: string;
};

export const openGraph = ({
  siteName,
  templateTitle,
  description,
  logo = 'https://lr-og.vercel.app/images/logo.jpg',
}: OpenGraphType): string => {
  const ogLogo = encodeURIComponent(logo);
  const ogSiteName = encodeURIComponent(siteName.trim());
  const ogTemplateTitle = templateTitle
    ? encodeURIComponent(templateTitle.trim())
    : undefined;
  const ogDesc = encodeURIComponent(description.trim());

  return `https://lr-og.vercel.app/api/general?siteName=${ogSiteName}&description=${ogDesc}&logo=${ogLogo}${
    ogTemplateTitle ? `&templateTitle=${ogTemplateTitle}` : ''
  }`;
};

export const loadGoogleFont = async (
  font = 'Geist',
  weight = 400,
  text?: string,
) => {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}${text ? `&text=${encodeURIComponent(text)}` : ''}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error('failed to load font data');
};
