'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase';
// Components
import LabelCalendar from '../calendar/LabelCalendar';
import MDEditor from '@uiw/react-md-editor';
// Shardcn UI
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

// CSS
import styles from './MarkdownDialog.module.scss';

function MarkdownDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContents] = useState<string | undefined>('');
  const { toast } = useToast();

  // ---

  // Supabase에 저장
  const onSubmit = async () => {
    if (!title || !content) {
      toast({
        title: '작성되지 않은 부분이 있습니다.',
        description: '제목, 날짜 혹은 내용을 모두 작성해주세요.',
      });
      return;
    } else {
      // Supabase 데이터베이스에 연동

      const { data, error, status } = await supabase
        .from('todos')
        .insert([{ title: title, content: content }])
        .select();

        if (error) {
          console.log(error);
          toast({
            title: '에러',
            description: '에러가 발생했습니다.',
          });
        }

        if (status === 201) {
          toast({
            title: '저장 완료',
            description: '작성한 글이 정상적으로 저장되었습니다.',
          });

          // 등록 후 조건 초기화
          setOpen(false);
        }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="font-normal text-gray-400 hover:text-gray-500 cursor-pointer">
          Add Contents
        </span>
      </DialogTrigger>

      <DialogContent className="max-w-fit">
        <DialogHeader>
          <DialogTitle>
            <div className={styles.dialog__titleBox}>
              <Checkbox className="w-5 h-5" />
              <input
                type="text"
                placeholder="Write a title for your board."
                className={styles.dialog__titleBox__title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </DialogTitle>

          <div className={styles.dialog__calendarBox}>
            <LabelCalendar label="From" />
            <LabelCalendar label="To" />
          </div>

          <Separator />

          <div className={styles.dialog__markdown}>
            <MDEditor value={content} height={100 + '%'} onChange={setContents} />
          </div>
        </DialogHeader>

        <DialogFooter>
          <div className={styles.dialog__buttonBox}>
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="font-normal text-gray-400 hover:bg-gray-50 hover:text-gray-500"
              >
                Cancel
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                type="submit"
                className="font-normal border-orange-500 bg-orange-400 text-white hover:bg-orange-400 hover:text-white"
                onClick={onSubmit}
              >
                Done
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MarkdownDialog;
