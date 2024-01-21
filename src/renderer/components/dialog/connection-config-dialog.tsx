import { CaretSortIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '/~/components/ui/dropdown-menu';

import React from 'react';
import { CONNECTION_FORM } from '/renderer/models/constants';

const renderForm = (connectionForm: CONNECTION_FORM) => {
  switch (connectionForm) {
    case CONNECTION_FORM.CONNECTION_SQL_SERVER_FORM:
      return <></>;
    default:
      return <div></div>;
  }
};

type ConnectionConfigDialogParams = {
  handClose: () => void;
};

const ConnectionConfigDialog = ({
  handClose,
}: ConnectionConfigDialogParams) => {
  const [connectionForm, setConnectionForm] = React.useState<CONNECTION_FORM>(
    CONNECTION_FORM.CONNECTION_SQL_SERVER_FORM
  );

  return <div className="w-[500px] h-[200px]"></div>;
};

export default ConnectionConfigDialog;
