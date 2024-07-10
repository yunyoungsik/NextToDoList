import Image from 'next/image';
import LabelCalendar from '@/components/common/calendar/LabelCalendar';
import { iconAdd } from '@/constants';
// Shadcn UI
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
// css
import styles from './page.module.scss';
import BasicBoard from '@/components/common/board/BasicBoard';

function page() {
  return (
    <div className={styles.container}>
      <header className={styles.container__header}>
        <div className={styles.container__header__contents}>
          <input type="text" placeholder="Enter Title Hero" className={styles.input} />

          <div className={styles.progressBar}>
            <span className={styles.progressBar__status}>0/10 completed</span>

            {/* 프로그레스 바 UI */}
            <Progress value={33} className="w-[30%]" indicatorColor="bg-green-400" />
          </div>

          <div className={styles.calendarBox}>
            <div className={styles.calendarBox__calendar}>
              {/* 캘린더 UI */}
              <LabelCalendar
                label="From" 
                // readonly={true}
              />
              <LabelCalendar
                label="To"
                // readonly={true}
              />
            </div>

            <Button
              variant="outline"
              className="w-[15%] border-orange-500 bg-orange-400 text-white hover:bg-orange-400 hover:text-white"
            >
              Add New Board
            </Button>
          </div>
        </div>
      </header>

      <main className={styles.container__body}>
        {/* <div className={styles.container__body__infoBox}>
          <span className={styles.title}>There is no board yet.</span>
          <span className={styles.subTitle}>Click the button and start flashing!</span>

          <button className={styles.button}>
            <Image src={iconAdd} alt="Add" />
          </button>
        </div> */}

        <BasicBoard />
      </main>
    </div>
  );
}

export default page;