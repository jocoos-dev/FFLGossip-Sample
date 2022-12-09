import { MouseEvent, useState } from 'react';

import { SvgIconComponent } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, Menu, MenuItem, Stack } from '@mui/material';

export interface MenuItem {
  name: string;
  icon: SvgIconComponent;
  onClick: () => void;
}

interface Props {
  items: MenuItem[];
}

export function MoreMenu({ items }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const onClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const onClickGenerator = (onClick: () => void) => () => {
    onClick();
    onClose();
  };

  return (
    <Box>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={onClick}
        sx={{ p: '3px' }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={onClose}
        elevation={1}
      >
        {items.map((item) => (
          <MenuItem key={item.name} onClick={onClickGenerator(item.onClick)}>
            <Stack direction="row" alignItems="center">
              <item.icon sx={{ mr: '8px' }} />
              {item.name}
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
