import { ICONS, LABEL_ICONS } from '../logic/icons.js';

// Stroke icon from the design set. Pass `name`, or `label` to pick by stat-card label.
export default function Icon({ name, label, width = 18, height = 18, strokeWidth = 1.9, ...rest }) {
  const nm = name != null ? name : (LABEL_ICONS[label] || 'chart');
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}
      dangerouslySetInnerHTML={{ __html: ICONS[nm] || '' }} />
  );
}
