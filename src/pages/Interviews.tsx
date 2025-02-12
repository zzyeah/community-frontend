import { useInterview } from "@/hook/useInterview";
import { useTypes } from "@/hook/useTypes";
import { getInterviewTitleAsync } from "@/redux/interview/interviewSlice";
import { getTypeList } from "@/redux/type/typeSlice";
import { FloatButton, Tree, TreeDataNode } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "@/styles/Interview.module.css";
import PageHeader from "@/components/PageHeader";
import { getInterviewById } from "@/api/_index";
import { InterviewItem } from "@/types/interview/interviewItem.interface";

function Interviews(props) {
  const dispatch = useDispatch();
  const { interviewTitleList } = useInterview();
  const { typeList } = useTypes();
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [interviewInfo, setInterviewInfo] = useState<InterviewItem>();

  useEffect(() => {
    if (!interviewTitleList.length) {
      dispatch<any>(getInterviewTitleAsync());
    }
    if (!typeList.length) {
      dispatch<any>(getTypeList());
    }

    if (typeList.length && interviewTitleList.length) {
      const result: TreeDataNode[] = [];
      typeList.forEach(({ typeName, id }, i) => {
        result.push({
          title: <h3 style={{ fontWeight: 200 }}>{typeName}</h3>,
          key: i,
        });
      });
      interviewTitleList.forEach((interviews: any[], i: number) => {
        const childArr: TreeDataNode[] = [];
        interviews.forEach((interview, j: number) => {
          childArr.push({
            title: (
              <h4
                style={{ fontWeight: 200 }}
                onClick={() => handleClick(interview.id)}
              >
                {interview.interviewTitle}
              </h4>
            ),
            key: `${i}-${j}`,
          });
        });
        result[i].children = childArr;
      });
      setTreeData(result);
    }
  }, [
    dispatch,
    interviewTitleList,
    interviewTitleList.length,
    typeList,
    typeList.length,
  ]);

  async function handleClick(id: string) {
    const { data, code } = await getInterviewById(id);
    if (code === 0) setInterviewInfo(data);
  }
  function InterviewRightSide() {
    if (interviewInfo)
      return (
        <div className={styles.content}>
          <h1 className={styles.interviewRightTitle}>
            {interviewInfo?.interviewTitle}
          </h1>
          <div className={styles.contentContainer}>
            <div
              dangerouslySetInnerHTML={{
                __html: interviewInfo?.interviewContent,
              }}
            ></div>
          </div>
        </div>
      );
    else {
      return (
        <div
          style={{
            textAlign: "center",
            fontSize: "40px",
            fontWeight: "100",
            marginTop: "150px",
          }}
        >
          请在左侧选择面试题
        </div>
      );
    }
  }

  return (
    <div className={styles.container}>
      <PageHeader title="面试题库" />
      <div className={styles.interviewContainer}>
        <div className={styles.leftSide}>
          <Tree treeData={treeData}></Tree>
        </div>
        <div className={styles.rightSide}>
          <InterviewRightSide />
        </div>
      </div>
      <FloatButton.BackTop visibilityHeight={0}/>
    </div>
  );
}

export default Interviews;
