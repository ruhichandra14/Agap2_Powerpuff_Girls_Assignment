'use client';

import Spinner from '@atlaskit/spinner';
import { Box, Inline, Text } from '@atlaskit/primitives';
import { STRINGS } from '@/constants/strings';

const Loading = () => (
  <Box padding="space.600">
    <Inline space="space.150" alignBlock="center" alignInline="center">
      <Spinner size="medium" />
      <Text color="color.text.subtlest">{STRINGS.episodes.loading}</Text>
    </Inline>
  </Box>
);

export default Loading;
