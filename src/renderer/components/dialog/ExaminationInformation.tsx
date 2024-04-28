import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '/~/components/ui/dialog';
import { Button } from '../../../~/components/ui/button';
import Doctor from '../../../main/models/doctor';
import Examination from '../../../main/models/examination';

type Params = {
  examination: Examination;
};

export default function ExaminationInformation({ examination }: Params) {
  return (
    <>
      <DialogContent className="min-w-[650px] px-5">
        <DialogHeader>
          <DialogTitle>Chi tiết ca khám</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2">
            <span className="select-none text-muted-foreground w-28 flex justify-end">
              ID:
            </span>
            <span className="w-[450px]">{examination.id}</span>
          </div>
          <div className="w-full h-px bg-border"></div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className=" select-none text-muted-foreground w-28 flex justify-end">
              Bệnh:
            </span>
            <span className="w-[450px]">{examination.disease}</span>
          </div>
          <div className="w-full h-px bg-border"></div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className=" select-none text-muted-foreground w-28 flex justify-end">
              Mức độ:
            </span>
            <span className="w-[450px]">{examination.level}</span>
          </div>
          <div className="w-full h-px bg-border"></div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className=" select-none text-muted-foreground w-28 flex justify-end">
              Bệnh lý nền:
            </span>
            <span className="w-[450px]">{examination.underlyingDisease}</span>
          </div>
          <div className="w-full h-px bg-border"></div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className=" select-none text-muted-foreground w-28 flex justify-end">
              Lời dặn:
            </span>
            <span className="w-[450px]">{examination.advice}</span>
          </div>
          <div className="w-full h-px bg-border"></div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className=" select-none text-muted-foreground w-28 flex justify-end">
              Mô tả:
            </span>
            <span className="w-[450px] break-all">
              {examination.description}
            </span>
          </div>
          <div className="w-full h-px bg-border"></div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className=" select-none text-muted-foreground w-28 flex justify-end">
              Trạng thái:
            </span>
            <span className="w-[450px]">{examination.status}</span>
          </div>
          <div className="w-full h-px bg-border"></div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className=" select-none text-muted-foreground w-28 flex justify-end">
              Mô tả:
            </span>
            <span className="w-[450px]">{examination.description}</span>
          </div>
          <div className="w-full h-px bg-border"></div>
        </div>

        <DialogFooter className="flex items-center justify-end w-full">
          <DialogClose>
            <Button variant={'default'}>Hoàn tất</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </>
  );
}
