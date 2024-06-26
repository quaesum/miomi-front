import { Typography, Box, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router";
export default function TermsOfUse() {
  const navigation = useNavigate()
  return (
    <Box className="flex flex-col w-screen h-fit items-center pt-6 ">
      <Box className="flex flex-col w-3/4 items-center space-y-5 bg-white p-12 rounded">
        <div className="flex flex-row items-center">
          <IconButton className="text-black" onClick={() => navigation("/registration")}>
            <ArrowBack />
          </IconButton>
          <Typography className="flex w-max h-max items-center text-center" fontSize={24} fontWeight="bold">
            Пользовательское Соглашение
          </Typography>
        </div>
        <Typography>
          Настоящее Пользовательское Соглашение (Далее Соглашение) регулирует
          отношения между владельцем miomi.by (далее MioMi или Администрация) с
          одной стороны и пользователем сайта с другой. Сайт MioMi является
          средством массовой информации.
        </Typography>
        <Typography textAlign="left" className="w-full pb-12">
          Используя сайт, Вы соглашаетесь с условиями данного соглашения.
          <p className="font-bold">
            Если Вы не согласны с условиями данного соглашения, не используйте
            сайт MioMi!
          </p>
        </Typography>
        <Typography textAlign="left" className="w-full pb-12">
          <p className="font-bold text-base">Предмет соглашения</p>
          <p className="font-bold">
            Администрация предоставляет пользователю право на размещение на
            сайте следующей информации:
          </p>
          <p>- Текстовой информации</p>
          <p>- Фотоматериалов</p>
        </Typography>
        <Typography textAlign="left" className="w-full pb-8">
          <p className="font-bold text-base">Права и обязанности сторон</p>
          <p className="font-bold">Пользователь имеет право:</p>
          <p>- осуществлять поиск информации на сайте</p>
          <p>- получать информацию на сайте</p>
          <p>- создавать информацию для сайта</p>
          <p>- распространять информацию на сайте</p>
          <p>- использовать информацию сайта в личных некоммерческих целях</p>
        </Typography>
        <Typography textAlign="left" className="w-full pb-8">
          <p className="font-bold">Администрация имеет право:</p>
          <p>
            - по своему усмотрению и необходимости создавать, изменять, отменять
            правила
          </p>
          <p>- ограничивать доступ к любой информации на сайте</p>
          <p>- создавать, изменять, удалять информацию</p>
        </Typography>
        <Typography textAlign="left" className="w-full pb-8">
          <p className="font-bold">Пользователь обязуется:</p>
          <p>- обеспечить достоверность предоставляемой информации</p>
          <p>- не нарушать работоспособность сайта</p>
          <p>
            - не создавать несколько учётных записей на Сайте, если фактически
            они принадлежат одному и тому же лицу
          </p>
        </Typography>
        <Typography textAlign="left" className="w-full pb-12">
          <p className="font-bold">Администрация обязуется:</p>
          <p>
            - поддерживать работоспособность сайта за исключением случаев, когда
            это невозможно по независящим от Администрации причинам.
          </p>
        </Typography>
        <Typography textAlign="left" className="w-full pb-12">
          <p className="font-bold text-base">Ответственность сторон</p>
          <p>
            - пользователь лично несет полную ответственность за
            распространяемую им информацию
          </p>
          <p>
            - администрация не несет никакой ответственности за достоверность
            информации, скопированной из других источников
          </p>
          <p>
            - администрация не несёт ответственность за несовпадение ожидаемых
            Пользователем и реально полученных услуг
          </p>
          <p>
            - администрация не несет никакой ответственности за услуги,
            предоставляемые третьими лицами
          </p>
          <p>
            - в случае возникновения форс-мажорной ситуации (боевые действия,
            чрезвычайное положение, стихийное бедствие и т. д.)
          </p>
          <p>
            Администрация не гарантирует сохранность информации, размещённой
            Пользователем, а также бесперебойную работу информационного ресурса
          </p>
        </Typography>
        <Typography textAlign="left" className="w-full pb-24">
          <p className="font-bold text-base">Условия действия Соглашения</p>
          <p>
            Данное Соглашение вступает в силу при любом использовании данного
            сайта.
          </p>
          <p>
            Соглашение перестает действовать при появлении его новой версии.
          </p>
          <p>
            Администрация оставляет за собой право в одностороннем порядке
            изменять данное соглашение по своему усмотрению.
          </p>
          <p>
            При изменении соглашения, в некоторых случаях, администрация может
            оповестить пользователей удобным для нее способом.
          </p>
        </Typography>
      </Box>
    </Box>
  );
}
