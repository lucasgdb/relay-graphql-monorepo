import { DefaultErrorPage } from '@example/components';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <DefaultErrorPage
      title="Ooops!"
      description="Página não encontrada."
      information="A página que você está acessando não existe ou está temporariamente indisponível. Enquanto isso, que tal acessar uma das opções abaixo?"
      actionText="Página Inicial"
      onActionClick={() => navigate('/')}
      disableOptionalButton
    />
  );
}
