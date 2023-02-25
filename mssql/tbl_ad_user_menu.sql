
IF OBJECT_ID('fn_seq_tbl_ad_user_menu') IS NOT NULL DROP FUNCTION fn_seq_tbl_ad_user_menu
IF OBJECT_ID('sp_tbl_ad_user_menu') IS NOT NULL DROP PROCEDURE sp_tbl_ad_user_menu
GO
CREATE FUNCTION fn_seq_tbl_ad_user_menu()
  RETURNS INT
AS
BEGIN
  DECLARE @ID INT = 0
  SELECT @ID = ISNULL(MAX(Id_user_menu),0)+1 FROM tbl_ad_user_menu
  RETURN @ID
END
GO
CREATE PROCEDURE sp_tbl_ad_user_menu
  @ACTION NVARCHAR(40) = NULL,
  @RAWPRM NVARCHAR(255) = NULL,
  @Id_user_menu INT = NULL,
  @Id_user INT = NULL,
  @Id_menu INT = NULL,
  @user_mod NVARCHAR(20) = NULL,
  @date_mod DATETIME = NULL,
  @active INT = NULL
AS
SET NOCOUNT ON
  DECLARE @MSG NVARCHAR(MAX) = ''
  
  IF ISNULL(@ACTION,'') = 'S'
  BEGIN
    SELECT
    A.Id_user_menu,
    A.Id_user,
    A.Id_menu,
    A.user_mod,
    A.date_mod,
    A.active
    FROM tbl_ad_user_menu A WHERE 1 = 1
    AND (COALESCE(@Id_user_menu,A.Id_user_menu) = A.Id_user_menu OR @Id_user_menu IS NULL)
    AND (COALESCE(@Id_user,A.Id_user) = A.Id_user OR @Id_user IS NULL)
    AND (COALESCE(@Id_menu,A.Id_menu) = A.Id_menu OR @Id_menu IS NULL)
    AND (COALESCE(@user_mod,A.user_mod) = A.user_mod OR @user_mod IS NULL)
    AND (COALESCE(@date_mod,A.date_mod) = A.date_mod OR @date_mod IS NULL)
    AND (COALESCE(@active,A.active) = A.active OR @active IS NULL)
  END
  IF ISNULL(@ACTION,'') = 'I'
  BEGIN 
    BEGIN TRY
    BEGIN TRAN
      SET IDENTITY_INSERT tbl_ad_user_menu ON
      
      SET @Id_user_menu = dbo.fn_seq_tbl_ad_user_menu()
      INSERT INTO tbl_ad_user_menu(
      Id_user_menu,
      Id_user,
      Id_menu,
      user_mod,
      date_mod,
      active
      )
      VALUES(
      @Id_user_menu,
      @Id_user,
      @Id_menu,
      @user_mod,
      @date_mod,
      @active
      )
      
      DECLARE @IDENTITY INT = @@IDENTITY
      SELECT A.* FROM tbl_ad_user_menu A 
      WHERE A.Id_user_menu = @IDENTITY 
      SET IDENTITY_INSERT tbl_ad_user_menu OFF
    COMMIT
    END TRY
    BEGIN CATCH
      ROLLBACK
      SET @MSG = ERROR_MESSAGE() + ' ERRLINE > ' + ERROR_LINE() + 'ERRNUMBER > ' + ERROR_NUMBER()
      RAISERROR(@MSG,18,0)
    END CATCH
  END
  
  IF ISNULL(@ACTION,'') = 'U'
  BEGIN
    UPDATE A SET
    A.Id_user = @Id_user,
    A.Id_menu = @Id_menu,
    A.user_mod = @user_mod,
    A.date_mod = @date_mod,
    A.active = @active
    FROM tbl_ad_user_menu A
    WHERE A.Id_user_menu = @Id_user_menu
    
    SELECT A.* FROM tbl_ad_user_menu A 
    WHERE A.Id_user_menu = @Id_user_menu
  END
  
  IF ISNULL(@ACTION,'') = 'D'
  BEGIN
    DELETE
    FROM tbl_ad_user_menu
    WHERE Id_user_menu = @Id_user_menu
    
    SELECT @Id_user_menu Id_user_menu
  END
  
SET NOCOUNT OFF
